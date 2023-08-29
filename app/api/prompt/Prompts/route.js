import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { search } = await request.json();
  console.log(search);
  try {
    await connectToDB();
    const prompts = (await Prompt.find({}).populate("creator")).filter(
      (prompt) => {
        return prompt.tag === Prompt.tag || Prompt.prompt === prompt.prompt;
      }
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch any prompts", { status: 500 });
  }
};
