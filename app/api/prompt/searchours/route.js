import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { search, id } = await request.json();

  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: id })
      .populate("creator")
      .filter((prompt) => {
        return (
          prompt.tag.slice(0, search.length) === search ||
          prompt.prompt.slice(0, search.length) === search
        );
      });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
