import { createClient } from "@supabase/supabase-js";

const API_URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(API_URL, ANON_KEY);

export const fetchLists = async (team_id) => {
  try {
    const response = await fetch(`${API_URL}/functions/v1/list_get`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team_id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    if (result.error) throw new Error(result.error);

    return result.data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};

export const createList = async (team_id, name) => {
  try {
    const { data, error } = await supabase
      .from("lists")
      .insert([
        {
          team_id,
          name,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating list:", error);
    return null;
  }
};

export const fetchLinkedInProfiles = async (
  listId,
  filters = {},
  page,
  pageSize,
  team_id
) => {
  try {
    const url = new URL(`${API_URL}/functions/v1/getLinkedinProfiles`);
    url.searchParams.append("list_id", listId);
    url.searchParams.append("team_id", team_id);
    url.searchParams.append("email_status", filters.email_status);
    url.searchParams.append("has_phone", filters.has_phone);
    url.searchParams.append("title", filters.title);
    url.searchParams.append("company", filters.company);
    url.searchParams.append("page", page);
    url.searchParams.append("page_size", pageSize);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
        apikey: ANON_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Failed to fetch posts");

    return data.data;
  } catch (error) {
    console.error("Error fetching LinkedIn profiles:", error);
    return [];
  }
};

export const createUserAndTeam = async (userData) => {
  try {
    // First, create user entry
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([
        {
          full_name: userData.full_name,
          email: userData.email,
        },
      ])
      .select()
      .single();

    if (userError) throw userError;

    const { data: existingInvite, error: memberError } = await supabase
      .from("team_members")
      .select("*")
      .eq("email", user.email)
      .single();

    let team = null;

    if (existingInvite) {
      // Update team_members table with user_id and set status to accepted
      const { error: updateError } = await supabase
        .from("team_members")
        .update({ user_id: user.id, status: "accepted" })
        .eq("email", existingInvite.email);

      if (updateError) {
        console.error("Error updating team member:", updateError);
      }

      // Fetch the existing team to update user_ids
      const { data, error: fetchTeamError } = await supabase
        .from("teams")
        .select("user_ids")
        .eq("id", existingInvite.team_id)
        .single();

      if (fetchTeamError) {
        console.error("Error fetching team:", fetchTeamError);
      } else {
        // Update team user_ids array
        const updatedUserIds = [...new Set([...data.user_ids, user.id])]; // Ensure unique user IDs

        const { error: teamMemberUpdateError } = await supabase
          .from("teams")
          .update({ user_ids: updatedUserIds })
          .eq("id", existingInvite.team_id)
          .select()
          .single(); // Ensure you get the updated team

        if (teamMemberUpdateError) {
          console.error("Error updating team user IDs:", teamMemberUpdateError);
        } else {
          team = { ...data, user_ids: updatedUserIds }; // Assign updated team
        }
      }
    } else {
      // Create a new team with the user
      const { data, error: teamError } = await supabase
        .from("teams")
        .insert([
          {
            name: `${user.full_name}'s Team`,
            user_ids: [user.id],
          },
        ])
        .select()
        .single();

      if (teamError) {
        console.error("Error creating team:", teamError);
      } else {
        team = data; // Assign newly created team
        const { error: memberError } = await supabase
          .from("team_members")
          .insert([
            {
              team_id: team.id,
              user_id: user.id,
              name: user.full_name,
              email: user.email,
              role: "admin",
              status: "accepted",
            },
          ]);

        if (memberError) {
          console.error("Error adding user to team_members:", memberError);
        } else {
          console.log("User successfully added to team_members");
        }
      }
    }

    return { user, team };
  } catch (error) {
    console.error("Error creating user and team:", error);
    throw error;
  }
};

export const deleteLinkedInProfiles = async (team_id, profileIds) => {
  if (!profileIds.length) return { success: false, error: "No IDs provided" };

  try {
    const { error } = await supabase
      .from("linkedin_profiles")
      .delete()
      .in("id", profileIds)
      .eq("team_id", team_id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting LinkedIn profiles:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteList = async (team_id, listId) => {
  try {
    if (!team_id || !listId)
      throw new Error("Both teamId and listId are required");

    const bodyData = JSON.stringify({
      operation: "delete",
      team_id,
      list_id: listId,
    });

    const response = await fetch(`${API_URL}/functions/v1/list_manage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: bodyData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data?.error) throw new Error(data.error);
    return data?.success || false;
  } catch (error) {
    console.error("Error deleting list:", error.message);
    throw error;
  }
};

export const fetchTeamMembers = async (team_id) => {
  try {
    const url = `${API_URL}/functions/v1/get_team_members?team_id=${team_id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.invites;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
};

export const inviteUser = async (team_id, email, role, name) => {
  try {
    const response = await fetch(`${API_URL}/functions/v1/invite-user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team_id, email, role, name }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to invite user");
    }

    return result;
  } catch (error) {
    console.error("Error inviting user:", error);
    throw new Error(error.message);
  }
};

export const addKeyword = async (team_id, user_id, keywordsArray) => {
  const keywordsWithMeta = keywordsArray.map((keywordEntry) => ({
    ...keywordEntry,
    team_id,
    user_id,
  }));

  try {
    const response = await fetch(
      "https://cafqluqomuhgtchexldv.supabase.co/functions/v1/tracking_list",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(keywordsWithMeta),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to add keywords");
    }

    return { data: result };
  } catch (error) {
    console.error("Error adding keywords:", error);
    return { error: error.message };
  }
};

export const fetchTrackingLists = async (team_id) => {
  try {
    const response = await fetch(
      `${API_URL}/functions/v1/tracking_list?team_id=${team_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch tracking lists");
    }

    return result;
  } catch (error) {
    console.error("Error fetching tracking lists:", error);
    return { error: error.message };
  }
};

export const deleteTrackingList = async (trackingListsId) => {
  if (!trackingListsId) {
    return { error: "Missing tracking_lists_id parameter" };
  }

  console.log(trackingListsId);

  try {
    const response = await fetch(`${API_URL}/functions/v1/tracking_list`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tracking_lists_id: trackingListsId }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to delete tracking list");
    }

    return { data: result };
  } catch (error) {
    console.error("Error deleting tracking list:", error);
    return { error: error.message };
  }
};

export const getKeywordsById = async (trackingListId) => {
  return await supabase
    .from("keyword_tracking")
    .select("*")
    .eq("tracking_lists_id", trackingListId);
};

export const getTrackingListNameById = async (trackingListId) => {
  const data = await supabase
    .from("tracking_lists")
    .select("*")
    .eq("id", trackingListId);
  return data;
};

export const editTrackingList = async (
  name,
  tracking_lists_id,
  is_public,
  fetch_freq,
  notifications
) => {
  try {
    const response = await fetch(`${API_URL}/functions/v1/tracking_list`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        tracking_lists_id,
        is_public,
        fetch_freq,
        notifications,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to edit tracking list");
    }

    return { data: result };
  } catch (error) {
    console.error("Error updating tracking list:", error);
    return { error: error.message };
  }
};

export const editTrackingKeyword = async (team_id, user_id, keywords) => {
  if (!Array.isArray(keywords)) {
    console.error("Invalid data: keywords should be an array", keywords);
    return { error: "Invalid input: keywords must be an array" };
  }

  try {
    const updatedKeywords = keywords.map((keyword) => ({
      ...keyword,
      team_id,
      user_id,
    }));

    const response = await fetch(`${API_URL}/functions/v1/keyword_tracking`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedKeywords),
    });

    const result = await response.json();

    return { data: result };
  } catch (error) {
    console.error("Error updating tracking keywords:", error);
    return { error: error.message };
  }
};

export const fetchPosts = async (
  trackingListsId,
  page,
  sentiment,
  influenceScore,
  sortBy,
  keyword_id,
  searchTerm,
  is_saved,
  team_id
) => {
  try {
    const url = new URL(`${API_URL}/functions/v1/posts`);
    url.searchParams.append("tracking_lists_id", trackingListsId);
    url.searchParams.append("current_page", page);
    url.searchParams.append("sentiment", sentiment);
    url.searchParams.append("influence_score", influenceScore);
    url.searchParams.append("sort_by", sortBy);
    url.searchParams.append("keyword_id", keyword_id);
    url.searchParams.append("search_term", searchTerm);
    url.searchParams.append("is_saved", is_saved);

    if (team_id) {
      url.searchParams.append("team_id", team_id);
    } else {
      console.warn("No team_id found, proceeding without it.");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Failed to fetch posts");

    return { data };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: error.message };
  }
};

export const deletePost = async (team_id, trackingListsId, postId) => {
  try {
    const url = new URL(`${API_URL}/functions/v1/posts`);
    url.searchParams.append("tracking_lists_id", trackingListsId);
    url.searchParams.append("post_id", postId);
    url.searchParams.append("team_id", team_id);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Failed to delete post");

    return { message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const fetchTrackingListDetails = async (tracking_list_id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("tracking_list_id", tracking_list_id);

  if (error) {
    console.error("Error fetching tracking list details:", error);
    return { error: error.message };
  }

  return { data };
};

export const fetchEmail = async (fullName, domain, id) => {
  try {
    const res = await fetch(`${API_URL}/functions/v1/discover_company_emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ full_name: fullName, domain }),
    });

    const data = await res.json();

    const emailToStore = data?.email || "Not found";
    const statusToStore = data?.status || "fetched";
    const typeToStore = data?.type || "company_email";

    const { error } = await supabase.from("email_info").insert([
      {
        email: emailToStore,
        status: statusToStore,
        type: typeToStore,
        linkedin_profile_id: id,
      },
    ]);

    if (error) {
      console.error("Failed to insert email into DB:", error.message);
    }

    return data;
  } catch (err) {
    console.error("Failed to fetch email:", err);
  }
};

export const updateBookmark = async (postId, trackingListId, bookmark) => {
  try {
    const { error } = await supabase
      .from("posts")
      .update({ bookmark })
      .eq("id", postId)
      .eq("tracking_lists_id", trackingListId);

    if (error) {
      console.error("Failed to update bookmark:", error.message);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error("Error updating bookmark:", err);
    return { success: false, error: err };
  }
};

export const addUserToList = async (team_id, listId, fullName, profileSlug) => {
  try {
    const res = await fetch(`${API_URL}/functions/v1/add_user_to_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({
        list_id: listId,
        team_id: team_id,
        full_name: fullName,
        profile_slug: profileSlug,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API Error:", data?.error || "Unknown error");
    }

    return data;
  } catch (err) {
    console.error("Failed to add user to list:", err);
  }
};

export const fetchProfileInfo = async (
  team_id,
  user_id,
  linkedin_profile_ids
) => {
  try {
    const res = await fetch(`${API_URL}/functions/v1/v2p-task-profile-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify(
        linkedin_profile_ids.map((linkedin_profile_id) => ({
          user_id,
          team_id,
          linkedin_profile_id,
        }))
      ),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API Error:", data?.error || "Unknown error");
    }

    return data;
  } catch (err) {
    console.error("Failed to add user to list:", err);
  }
};

export const scrapeLinkedinVideo = async (linkedin_video_url) => {
  if (!linkedin_video_url) {
    console.error("Invalid LinkedIn video URL");
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/functions/v1/scrapeLinkedinVideo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ url: linkedin_video_url }), // Use the key "url" for the body
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API Error:", data?.error || "Unknown error");
      return null;
    }

    return data; // Returns the API response
  } catch (err) {
    console.error("Failed to scrape LinkedIn video:", err);
    return null;
  }
};

export const boostContent = async (content) => {
  console.log("api called in supabase.js");
  try {
    const response = await fetch(`${API_URL}/functions/v1/boostPostContent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: content }),
    });

    console.log("response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    if (result.error) throw new Error(result.error);

    return result.data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};
