const baseUrl = 'https://api.lootboxapp.com/phumphwng';

export async function updateUser(userDetail, accessToken) {
  try {
    let res = await fetch(`${baseUrl}/user/update`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "authorization": `bearer ${accessToken}`
      },
      "body": JSON.stringify(userDetail)
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}


export async function getUser(accessToken) {
  try {
    let res = await fetch(`${baseUrl}/user/show`, {
      "method": "GET",
      "headers": {
        "authorization": `bearer ${accessToken}`
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
