export async function fetchPostJSON(url: string, data: any) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching data: ');
    }
  }
  