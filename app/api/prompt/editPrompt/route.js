import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const PUT = async (req, res) => {
  const { ID, prompt, tag } = await req.json();
  try {
    await connectToDB();
    await Prompt.findByIdAndUpdate(
      ID,
      { prompt: prompt, tag: tag },
      {
        new: true,
      }
    );
    return new Response("sucessful update", { status: 201 });
  } catch (error) {
    return new Response("failed to update", { status: 500 });
  }
};
export const POST = async (req, res) => {
  const { id } = await req.json();
  try {
    await connectToDB();
    const newPrompt = await Prompt.findById(id);
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("failed to update", { status: 500 });
  }
};
