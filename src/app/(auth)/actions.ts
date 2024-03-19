"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/services/auth/supabase/server";

export async function login(formData: FormData) {
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

export async function signup(formData: FormData) {
  const supabase = createClient();

  // TODO type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  // TODO handle error cases
  if (error) {
    console.log("error", error);
    return { message: "Invalid email or password" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
