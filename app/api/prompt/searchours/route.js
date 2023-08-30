import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { search, id } = await request.json();

  try {
    await connectToDB();
    const prompts = await Prompt.find()
      .populate("creator")
      .filter((prompt) => {
        return (
          prompt.tag.slice(0, search.length) === search && prompt.creator._id === id ||
          prompt.prompt.slice(0, search.length) === search && prompt.creator._id === id
        );
      });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
