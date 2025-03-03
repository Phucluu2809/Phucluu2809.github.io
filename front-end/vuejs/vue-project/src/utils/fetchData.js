export async function fetchPromise(URL) {
  try {
      const response = await fetch(URL);
      return await response.json();
  } catch (error) {
      console.error("Lỗi khi fetch dữ liệu!!!!!!!!!!!!", error);
      return null;
  }
}