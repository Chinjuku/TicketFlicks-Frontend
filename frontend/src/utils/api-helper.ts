import axios from "axios"
import { unstable_noStore as noStore } from 'next/cache';

// api "GET" requests 
export const tryCatchGetMethod = async (path: string, elseReturn: any) => {
  try {
    const res = await axios.get(`http://localhost:8000/api${path}`)
    if (res.status === 200) {
      return res.data
    } else {
      return elseReturn
    }
  } catch (err) {
    return elseReturn
  }
}

export const tryCatchGetDelayMethod = async (path: string, elseReturn: any) => {
  noStore();
  try {
    const res = await axios.get(`http://localhost:8000/api${path}`)
    if (res.status === 200) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.data
    } else {
      return elseReturn
    }
  } catch (err) {
    return elseReturn
  }
}

// api "POST" requests
export const tryCatchPostMethod = async (path: string, data: any) => {
  noStore();
  try {
    const res = await axios.post(`http://localhost:8000/api${path}`, data)
    if (res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.error(err)
  }
}

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

// api "DELETE" request
export const tryCatchDeleteMethod = async (path: string) => {
  try {
    const res = await axios.delete(`http://localhost:8000/api${path}`)
    if (res.status === 200) {
      return res.data
    }
  } catch (err) {
    console.error(err)
  }
}
