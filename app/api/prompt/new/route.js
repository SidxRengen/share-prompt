import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  // var a = [
  //   "#ff98dd33",
  //   "#f3898933",
  //   "#e7e1e533",
  //   "#878aed33",
  //   "#fd78ff33",
  //   "#4fbce533",
  //   "#7cf1a533",
  //   "#ccef7733",
  //   "#db775033",
  //   "#6f6a6d33",
  // ];
  // var b = Math.floor(Math.random() * 10);
  // const c = a[b]; 
  const { userID, prompt, tag } = await request.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({creator: userID, prompt, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
