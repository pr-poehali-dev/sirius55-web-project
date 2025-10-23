import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Icon from "@/components/ui/icon";

interface User {
  id: number;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
}

interface Order {
  id: number;
  plan: string;
  amount: number;
  status: string;
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: ""
  });

  useEffect(() => {
    const authData = localStorage.getItem("user_auth");
    if (!authData) {
      navigate("/login");
      return;
    }

    const { user: userData } = JSON.parse(authData);
    setUser(userData);
    setFormData({
      full_name: userData.full_name,
      phone: userData.phone || ""
    });
    
    loadOrders(userData.id);
  }, [navigate]);

  const loadOrders = async (userId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/9e3d7f5a-16fe-40e7-8a0a-ea0eaccddf51');
      const data = await response.json();
      
      const userOrders = data.orders.filter((order: any) => order.user_id === userId);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_auth");
    toast.success("Вы вышли из системы");
    navigate("/");
  };

  const handleSaveProfile = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      full_name: formData.full_name,
      phone: formData.phone
    };

    const authData = JSON.parse(localStorage.getItem("user_auth") || "{}");
    authData.user = updatedUser;
    localStorage.setItem("user_auth", JSON.stringify(authData));

    setUser(updatedUser);
    setEditMode(false);
    toast.success("Профиль обновлен");
  };

  const getPlanName = (plan: string) => {
    const plans: Record<string, string> = {
      basic: 'Базовый',
      premium: 'Премиум',
      vip: 'VIP'
    };
    return plans[plan] || plan;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: 'Ожидает', className: 'bg-yellow-500 hover:bg-yellow-600' },
      paid: { label: 'Оплачен', className: 'bg-green-500 hover:bg-green-600' },
      cancelled: { label: 'Отменён', className: 'bg-gray-500 hover:bg-gray-600' }
    };
    const config = variants[status] || variants.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Профиль</h1>
            <p className="text-muted-foreground">Управление вашим аккаунтом</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Icon name="Home" className="mr-2" size={18} />
              На главную
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" className="mr-2" size={18} />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="purchases">Покупки</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Добро пожаловать, {user.full_name}!</CardTitle>
                <CardDescription>Ваша учетная запись активна</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Ваш ID профиля</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-primary font-mono">{user.id}</p>
                    <Badge variant="outline" className="bg-primary/5">
                      ID для связи
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Используйте этот ID при общении с поддержкой
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-medium">{user.phone || "Не указан"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дата регистрации</p>
                    <p className="font-medium">{formatDate(user.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Всего покупок</p>
                    <p className="font-medium">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Последние покупки</CardTitle>
                <CardDescription>Ваши недавние заказы</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">У вас пока нет покупок</p>
                    <Button className="mt-4" onClick={() => navigate("/")}>
                      Перейти к рецептам
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{getPlanName(order.plan)}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold">{order.amount}₽</p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>История покупок</CardTitle>
                <CardDescription>Все ваши заказы и их статусы</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">У вас пока нет покупок</p>
                    <Button onClick={() => navigate("/")}>
                      Перейти к рецептам
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold">Заказ #{order.id}</p>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm font-medium text-primary">{getPlanName(order.plan)}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">{order.amount}₽</p>
                              {order.status === 'pending' && (
                                <Button size="sm" className="mt-2" asChild>
                                  <a href={`https://t.me/79836232746?text=Заказ%20${order.id}`} target="_blank" rel="noopener noreferrer">
                                    <Icon name="MessageCircle" size={16} className="mr-1" />
                                    Связаться
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Настройки профиля</CardTitle>
                <CardDescription>Обновите информацию о себе</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Полное имя</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email нельзя изменить</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!editMode}
                  />
                </div>
                <div className="flex gap-2">
                  {editMode ? (
                    <>
                      <Button onClick={handleSaveProfile}>
                        <Icon name="Save" className="mr-2" size={18} />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditMode(false);
                        setFormData({
                          full_name: user.full_name,
                          phone: user.phone || ""
                        });
                      }}>
                        Отмена
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setEditMode(true)}>
                      <Icon name="Edit" className="mr-2" size={18} />
                      Редактировать
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Безопасность</CardTitle>
                <CardDescription>Управление безопасностью аккаунта</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  <Icon name="Lock" className="mr-2" size={18} />
                  Изменить пароль (скоро)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;