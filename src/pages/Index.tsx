import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const services = [
    {
      icon: "Zap",
      title: "Экспресс-анализ",
      description: "Базовое исследование профиля за 24 часа",
      time: "24 часа"
    },
    {
      icon: "Target",
      title: "Углубленное исследование",
      description: "Полный анализ всех аспектов профиля",
      time: "48 часов"
    },
    {
      icon: "Shield",
      title: "Конфиденциально",
      description: "Гарантия безопасности данных",
      time: "100% защита"
    },
    {
      icon: "TrendingUp",
      title: "Аналитика роста",
      description: "Рекомендации по развитию профиля",
      time: "72 часа"
    }
  ];

  const portfolio = [
    {
      client: "E-commerce бренд",
      result: "Увеличение конверсии на 240%",
      metric: "+240%"
    },
    {
      client: "Блогер (500K подписчиков)",
      result: "Оптимизация контент-стратегии",
      metric: "+85%"
    },
    {
      client: "Стартап B2B",
      result: "Повышение узнаваемости",
      metric: "+320%"
    }
  ];

  const process = [
    { step: "01", title: "Запрос", desc: "Вы отправляете запрос с описанием задачи" },
    { step: "02", title: "Анализ", desc: "Мы проводим глубокое исследование профиля" },
    { step: "03", title: "Отчёт", desc: "Получаете детальный отчёт с рекомендациями" },
    { step: "04", title: "Поддержка", desc: "Консультируем по внедрению изменений" }
  ];

  const testimonials = [
    {
      name: "Анна Петрова",
      role: "CEO, Digital Agency",
      text: "Потрясающая скорость работы! Получили детальный анализ за сутки.",
      rating: 5
    },
    {
      name: "Дмитрий Козлов",
      role: "Маркетолог",
      text: "Качество анализа превзошло ожидания. Рекомендую!",
      rating: 5
    },
    {
      name: "Мария Соколова",
      role: "Основатель стартапа",
      text: "Быстро, качественно, по делу. Именно то, что нужно бизнесу.",
      rating: 5
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" size={28} />
            <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ProfilePro
            </span>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#process" className="hover:text-primary transition-colors">Процесс</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#contact">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Связаться
              </Button>
            </a>
          </div>
          <Button variant="ghost" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              Исследование профиля за 24 часа
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Быстрое выполнение исследований в сжатые сроки без потери качества
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg">
                <Icon name="Rocket" className="mr-2" size={20} />
                Заказать исследование
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-2">
                <Icon name="PlayCircle" className="mr-2" size={20} />
                Посмотреть примеры
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-primary" />
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-muted-foreground">
              Выберите оптимальный вариант для ваших задач
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-card to-muted border-2 hover:border-primary cursor-pointer animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-2xl w-fit mb-4 group-hover:animate-float">
                  <Icon name={service.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Icon name="Clock" size={16} />
                  <span>{service.time}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Портфолио
            </h2>
            <p className="text-xl text-muted-foreground">
              Результаты наших клиентов говорят сами за себя
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:scale-105 transition-all duration-300 border-2 hover:border-secondary animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-5xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                  {item.metric}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{item.client}</h3>
                <p className="text-muted-foreground">{item.result}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Как мы работаем
            </h2>
            <p className="text-xl text-muted-foreground">
              Простой и прозрачный процесс
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 mb-8 items-start animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-heading font-bold text-white">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-heading font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-xl text-muted-foreground">
              Что говорят о нас
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:scale-105 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-xl text-muted-foreground">
              Начните исследование уже сегодня
            </p>
          </div>
          <Card className="p-8 border-2 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Имя</label>
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-2"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-2"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Сообщение</label>
                <Textarea
                  placeholder="Расскажите о вашем проекте"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="border-2"
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Send" className="mr-2" size={20} />
                Отправить запрос
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <ChatWidget />

      <footer className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" size={24} />
              <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ProfilePro
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Globe" size={20} />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 ProfilePro. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;