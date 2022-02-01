

export async function createResponse(response, files) {
  try {
    const formData = new FormData();
    formData.append("response", JSON.stringify(response));
    files.forEach(q => {
      formData.append(q.title, q.files[0]);
    });
    const res = await fetch(`/api/responses`, {
        method: "POST",
        body: formData,
      }),
      result = await res.json();
    return result;
  } catch (err) {
    return err;
  }
}

export async function getResponse(id) {
  try {
    const res = await fetch(`/api/responses/${id}`, {
      }),
      result = await res.json();
    return result.response;
  } catch (err) {
    return err;
  }
}

