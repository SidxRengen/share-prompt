const { connectToDB } = require("@utils/database");
import Prompt from "@models/prompt";

export const DELETE = async (req, res) => {
  const { id } = await req.json();
  try {
    await connectToDB();
    await Prompt.findOneAndDelete({ _id: id });
    return new Response({ status: 201 });
  } catch (error) {
    // console.log(error);
    return new Response({ status: 500 });
  }
};
