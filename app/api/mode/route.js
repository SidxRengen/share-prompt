import { connectToDB } from "@utils/database";
import User from "@models/user";

export const PUT = async (req, res) => {
  const { mode1, id } = await req.json();
  try {
    await connectToDB();
    await User.findByIdAndUpdate(
      id,
      { mode: mode1 }
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
    const user = await User.findById(id);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("failed to get", { status: 500 });
  }
};

export const GET = async (req, res) => {
  try {
    const user = await User.find();
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("failed to get", { status: 500 });
  }
};
