import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { search } = await request.json();

  try {
    await connectToDB();
    const prompts = await Prompt.find({ tag: search }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
export const PUT = async (request) => {
  const { search , id} = await request.json();

  try {
    await connectToDB();
    const prompts = await Prompt.find({ tag: search,creator:id }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
