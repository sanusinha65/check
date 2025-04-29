export const updateIntercomUser = (userData) => {
  if (window.Intercom && userData) {
    window.Intercom('update', {
      user_id: userData.id,
      name: userData.full_name,
      email: userData.email,
      created_at: Math.floor(new Date(userData.created_at).getTime() / 1000)
    });
  }
};