import { redirect } from "next/navigation";

import { createClient } from "@/services/auth/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div>
      Hello {data.user.email}
      <form action="/auth/signout" method="post">
        <button className="button block" type="submit">
          Sign out
        </button>
      </form>
    </div>
  );
}
