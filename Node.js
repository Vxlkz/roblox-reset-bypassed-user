async function getUserData(username) {
  try {
    const response = await fetch('/api/get-user-id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.userId) {
        const userId = data.userId;
        const userName = data.userName;
        const profileLink = `https://www.roblox.com/users/${userId}/profile`;
        const lastOnline = data.lastOnline;

        document.getElementById('user-id').innerText = `User Name: ${userName}`;
        document.getElementById('profile-link').innerHTML = `Profile Link: <a href="${profileLink}" target="_blank">${profileLink}</a>`;
        document.getElementById('last-online').innerText = `Last Online: ${lastOnline}`;
      } else {
        document.getElementById('user-id').innerText = "User not found or banned.";
        document.getElementById('profile-link').innerText = "";
        document.getElementById('last-online').innerText = "";
      }
    } else {
      const errorData = await response.json();
      document.getElementById('user-id').innerText = `Error: ${errorData.message}`;
      document.getElementById('profile-link').innerText = "";
      document.getElementById('last-online').innerText = "";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('user-id').innerText = "Error fetching user data.";
    document.getElementById('profile-link').innerText = "";
    document.getElementById('last-online').innerText = "";
  }
}
