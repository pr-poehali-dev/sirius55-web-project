import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminPassword: ""
  });

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/02576727-90e3-4fde-9200-ba7be5d0b064', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user_auth", JSON.stringify({
          user: data.user,
          session_token: data.session_token
        }));
        toast.success("Вход выполнен успешно!");
        navigate("/profile");
      } else {
        toast.error(data.error || "Неверный email или пароль");
      }
    } catch (error) {
      toast.error("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (formData.adminPassword === "Sirius55") {
        localStorage.setItem("admin_auth", "true");
        navigate("/admin");
      } else {
        toast.error("Неверный пароль админа");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="text-3xl font-bold">
              <span className="text-primary">Sirius</span>55
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            {isAdmin ? "Админ-панель" : "Вход"}
          </CardTitle>
          <CardDescription className="text-center">
            {isAdmin ? "Введите пароль администратора" : "Войдите в свой аккаунт"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAdmin ? (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Пароль администратора</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="Введите пароль"
                  value={formData.adminPassword}
                  onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                  required
                  disabled={loading}
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2" size={18} />
                    Войти
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsAdmin(false)}
              >
                Вход для пользователей
              </Button>
            </form>
          ) : (
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2" size={18} />
                    Войти
                  </>
                )}
              </Button>
              <div className="space-y-2">
                <div className="text-center text-sm">
                  Нет аккаунта?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Зарегистрироваться
                  </Link>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-xs"
                  onClick={() => setIsAdmin(true)}
                >
                  Админ-вход
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;