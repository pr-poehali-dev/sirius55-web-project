import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: number;
  plan: string;
  amount: number;
  user_contact: string;
  status: string;
  created_at: string;
  user_id?: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [grantUserId, setGrantUserId] = useState("");
  const [grantPlan, setGrantPlan] = useState<'basic' | 'premium' | 'vip'>('basic');
  const [grantLoading, setGrantLoading] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? 'https://functions.poehali.dev/9e3d7f5a-16fe-40e7-8a0a-ea0eaccddf51'
        : `https://functions.poehali.dev/9e3d7f5a-16fe-40e7-8a0a-ea0eaccddf51?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

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

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    paid: orders.filter(o => o.status === 'paid').length,
    totalAmount: orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.amount, 0)
  };

  const handleGrantOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!grantUserId) {
      toast.error("Введите ID пользователя");
      return;
    }

    setGrantLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/d4bd4ae4-7ed8-4014-b76e-77523c43d8b8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(grantUserId),
          plan: grantPlan
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Заказ "${getPlanName(grantPlan)}" выдан пользователю ${data.user.email}`);
        setGrantUserId("");
        fetchOrders();
      } else {
        toast.error(data.error || "Ошибка выдачи заказа");
      }
    } catch (error) {
      toast.error("Ошибка соединения с сервером");
    } finally {
      setGrantLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Админ-панель</h1>
            <p className="text-muted-foreground">Управление заказами рецептов</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <Icon name="Home" className="mr-2" size={18} />
            Главное меню
          </Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="grant">Выдать заказ</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Всего заказов</CardDescription>
                  <CardTitle className="text-3xl">{stats.total}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Ожидают оплаты</CardDescription>
                  <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Оплачено</CardDescription>
                  <CardTitle className="text-3xl text-green-600">{stats.paid}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Сумма оплат</CardDescription>
                  <CardTitle className="text-3xl text-primary">{stats.totalAmount}₽</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Заказы</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={filter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('all')}
                    >
                      Все
                    </Button>
                    <Button
                      variant={filter === 'pending' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('pending')}
                    >
                      Ожидают
                    </Button>
                    <Button
                      variant={filter === 'paid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter('paid')}
                    >
                      Оплачено
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchOrders}
                    >
                      <Icon name="RefreshCw" size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-4">Загрузка...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Заказов пока нет</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">ID</th>
                          <th className="text-left py-3 px-4 font-semibold">User ID</th>
                          <th className="text-left py-3 px-4 font-semibold">Дата</th>
                          <th className="text-left py-3 px-4 font-semibold">План</th>
                          <th className="text-left py-3 px-4 font-semibold">Сумма</th>
                          <th className="text-left py-3 px-4 font-semibold">Контакт</th>
                          <th className="text-left py-3 px-4 font-semibold">Статус</th>
                          <th className="text-left py-3 px-4 font-semibold">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-mono text-sm">#{order.id}</td>
                            <td className="py-3 px-4 font-mono text-sm">
                              {order.user_id ? (
                                <Badge variant="outline" className="bg-primary/10">
                                  ID: {order.user_id}
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-sm">{formatDate(order.created_at)}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{getPlanName(order.plan)}</Badge>
                            </td>
                            <td className="py-3 px-4 font-semibold">{order.amount}₽</td>
                            <td className="py-3 px-4 text-sm">{order.user_contact || '—'}</td>
                            <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                            <td className="py-3 px-4">
                              <a
                                href={`https://t.me/79836232746?text=Заказ%20${order.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="ghost" size="sm">
                                  <Icon name="MessageCircle" size={16} className="mr-1" />
                                  Telegram
                                </Button>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grant">
            <Card>
              <CardHeader>
                <CardTitle>Выдать заказ пользователю</CardTitle>
                <CardDescription>
                  Введите ID пользователя и выберите план для выдачи заказа
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGrantOrder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">ID пользователя</Label>
                    <Input
                      id="userId"
                      type="number"
                      placeholder="Например: 1"
                      value={grantUserId}
                      onChange={(e) => setGrantUserId(e.target.value)}
                      disabled={grantLoading}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      ID можно найти в сообщениях Telegram или в списке заказов
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="plan">План</Label>
                    <Select value={grantPlan} onValueChange={(value: 'basic' | 'premium' | 'vip') => setGrantPlan(value)}>
                      <SelectTrigger id="plan">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Базовый (2990₽)</SelectItem>
                        <SelectItem value="premium">Премиум (6990₽)</SelectItem>
                        <SelectItem value="vip">VIP (14990₽)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" disabled={grantLoading} className="w-full">
                    {grantLoading ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                        Выдача...
                      </>
                    ) : (
                      <>
                        <Icon name="Gift" className="mr-2" size={18} />
                        Выдать заказ
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
