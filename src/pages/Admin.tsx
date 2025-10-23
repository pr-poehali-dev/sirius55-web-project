import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: number;
  plan: string;
  amount: number;
  user_contact: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');

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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
      </div>
    </div>
  );
};

export default Admin;