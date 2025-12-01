import { Factory, LogOut, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockKPIs } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const { user, userRole, signOut } = useAuth();
  
  const roleLabel = {
    mudur: "Müdür",
    personel: "Personel",
    operator: "Operatör"
  }[userRole || 'personel'];

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || "??";
  
  const kpiData = [
    {
      title: "Üretim Verimliliği",
      value: `${mockKPIs.uretimVerimlilik}%`,
      subtitle: "Günlük OEE Ortalaması",
    },
    {
      title: "Ürün Stok Durumu",
      value: "124.500 adet",
      subtitle: "Toplam stok",
    },
    {
      title: "Üretimde / Tamamlanan",
      value: "12 / 48 sipariş",
      subtitle: "Güncel üretim yükü",
    },
    {
      title: "Makine Bakım Geçmişi",
      value: "4 gün önce",
      subtitle: "27 bakım kaydı",
    },
  ];

  return (
    <div className="h-20 bg-gradient-to-r from-[#0A1128] to-[#122044] border-b border-sidebar-border px-6">
      <div className="h-full flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Factory className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">ÜRETİM</h1>
            <p className="text-xs text-muted-foreground">Yönetim Sistemi</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="flex-1 grid grid-cols-4 gap-4 max-w-5xl">
          {kpiData.map((kpi, index) => (
            <Card 
              key={index}
              className="relative p-4 bg-card border-l-2 border-l-primary shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium">{kpi.title}</p>
                <p className="text-xl font-bold text-card-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 flex-shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              <span>{user?.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <span className="mr-2">👤</span>
              <span>Rol: {roleLabel}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Çıkış Yap</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
