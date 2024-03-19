import { createClient } from "@/services/auth/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log("formData", formData);
  const supabase = createClient();

  // TODO type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log("data", data);

  const { error } = await supabase.auth.signInWithPassword(data);

  // TODO handle error cases
  if (error) {
    console.log(error);
    return { message: "Invalid email or password" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
