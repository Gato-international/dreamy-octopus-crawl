import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignInPage } from "@/components/ui/sign-in";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/admin/dashboard");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showError(error.message);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="bg-background text-foreground">
      <SignInPage
        heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
        onSignIn={handleSignIn}
      />
    </div>
  );
};

export default Login;