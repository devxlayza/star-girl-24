import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import haloImg from './assets/halo-1.png'
import flowImg from './assets/flow-1.png'
import umbraImg from './assets/umbra-1.png'


/* ====== EDITE AQUI: seus dados ====== */
const ME = {
  name: 'Layza Brito',
  email: 'layzabrito.67@gmail.com',
  github: 'https://github.com/devxlayza',
  linkedin: 'https://linkedin.com/in/layza-brito-8498aa229/',
}

/* Imagens: arquivos em src/assets/, importados no topo. Para mais de um print,
   importe o arquivo e inclua em `images` (as miniaturas aparecem sozinhas). */
const PROJECTS = [
  {
    title: 'HALO',
    script: 'Primeiro',
    desc: 'Protótipo navegável de uma plataforma SaaS multi-tenant com micro-frontends. Dá para alternar entre clientes e papéis de usuário, e os módulos em React e Angular carregam sob demanda ou ficam bloqueados conforme a permissão. O visual une gradientes com grão, vidro fosco e tipografia condensada.',
    stack: ['React', 'TypeScript', 'Tailwind'],
    live: '#',
    code: 'https://github.com/devxlayza/halo',
    images: [haloImg],
    tone: 'bg-paper text-scarlet border-scarlet',
  },
  {
    title: 'FLOW',
    script: 'Segundo',
    desc: 'Assistente de IA em que a resposta chega em streaming e o modelo pode chamar ferramentas que renderizam componentes reais na tela, como tabelas, formulários e gráficos. Estados de erro, cancelamento e nova tentativa são tratados com cuidado, para a experiência ir além de uma caixa de chat.',
    stack: ['Next.js', 'Node', 'PostgreSQL'],
    live: '#',
    code: 'https://github.com/devxlayza/flow',
    images: [flowImg],
    tone: 'bg-scarlet text-cream border-scarlet',
  },
  {
    title: 'UMBRA',
    script: 'Terceiro',
    desc: 'Página de lançamento de edição limitada, com contagem regressiva, fila virtual de acesso e estoque que cai em tempo real. Ao entrar, o usuário tem a sacola reservada por 5 minutos, e os itens voltam ao estoque se o tempo acabar. Fila, estoque e reserva são simulados no navegador, e o rodapé da página avisa isso.',
    stack: ['Vite', 'React', 'Framer Motion'],
    live: '#',
    code: 'https://github.com/devxlayza/umbra',
    images: [umbraImg],
    tone: 'bg-wine text-cream border-wine',
  },
]

const SKILLS = [
  { group: 'Interface', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
  { group: 'Qualidade', items: ['Acessibilidade', 'Testes', 'Performance', 'Git'] },
  { group: 'Design', items: ['Figma', 'Design systems', 'Animações', 'Responsivo'] },
]
/* ===================================== */

function useScrollVar() {
  useEffect(() => {
    let raf = 0
    const update = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      const root = document.documentElement.style
      root.setProperty('--sy', String(y))
      root.setProperty('--p', String(max > 0 ? y / max : 0))
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`}>{children}</div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['Sobre', '#sobre'], ['Projetos', '#projetos'], ['Skills', '#skills'], ['Contato', '#contato']]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-scarlet/40 bg-cream/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="font-script text-3xl leading-none text-wine sm:text-4xl">{ME.name}</a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {links.slice(0, 3).map(([l, h]) => (
            <a key={h} href={h} className="underline-offset-4 hover:underline">{l}</a>
          ))}
          <a href="#contato" className="rounded-full bg-scarlet px-5 py-2 font-semibold text-cream transition hover:bg-wine">Fale comigo</a>
        </nav>
        <button
          className="grid size-11 place-items-center rounded-full border border-scarlet md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-scarlet transition-all ${open ? 'top-1 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-scarlet transition-all ${open ? 'top-1 -rotate-45' : 'top-2.5'}`} />
          </span>
        </button>
      </div>
      {open && (
        <nav className="wrap flex flex-col border-t border-scarlet/30 pb-4 md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-scarlet/20 py-4 font-display text-3xl">{l}</a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero() {
  const word = 'FRONTEND'
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-wine pb-12 pt-28 text-cream sm:pb-16">
      <div className="parallax wrap">
        <p className="h-script text-cream/90" style={{ animation: 'rise 1s 0.1s both' }}>Creative</p>
        <h1 className="font-display text-[clamp(3.5rem,19vw,19rem)] leading-[0.88] tracking-tight" aria-label={word}>
          {word.split('').map((c, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="letter" style={{ animationDelay: `${0.25 + i * 0.07}s` }}>{c}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-6 text-sm sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md leading-7">
            Sou {ME.name}, desenvolvedora frontend. Transformo design em interfaces rápidas, acessíveis e com identidade.
          </p>
          <a href="#projetos" className="w-full rounded-full border border-cream px-6 py-3 text-center font-semibold transition hover:bg-cream hover:text-wine sm:w-fit">
            Ver projetos
          </a>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const text = 'Disponível para novos projetos ✷ '
  return (
    <div className="overflow-hidden whitespace-nowrap bg-scarlet py-3 font-display text-xl text-cream sm:py-4 sm:text-3xl" aria-hidden>
      <div className="drift w-max">{text.repeat(16)}</div>
    </div>
  )
}

function About() {
  return (
    <section id="sobre" className="section wrap grid gap-8 md:grid-cols-2 md:gap-16">
      <Reveal>
        <p className="h-script text-wine">Sobre mim</p>
        <h2 className="h-display">CÓDIGO COM CUIDADO</h2>
      </Reveal>
      <Reveal className="space-y-5 text-sm leading-7 md:pt-12">
        <p>Sou desenvolvedora frontend e gosto de dar identidade às páginas que construo.</p>
        <p>Com JavaScript e React, misturo design, movimento e código limpo para criar sites bonitos e que funcionam bem em qualquer tela.</p>
        <p className="italic text-wine">Os projetos abaixo mostram como eu penso e como eu faço.</p>
      </Reveal>
    </section>
  )
}

function Shot({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0)
  const [failed, setFailed] = useState(false)
  const src = images[i]
  return (
    <div className="order-first flex flex-col gap-3 md:order-none">
      <div className="flex aspect-[4/3] min-h-0 flex-col overflow-hidden rounded-2xl border border-current/60 bg-cream/10 md:aspect-auto md:flex-1">
        <div className="flex gap-1.5 border-b border-current/40 p-3">
          <span className="size-2.5 rounded-full bg-current" /><span className="size-2.5 rounded-full border border-current" /><span className="size-2.5 rounded-full border border-current" />
        </div>
        {src && !failed ? (
          <img key={src} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="min-h-0 w-full flex-1 object-cover object-top" />
        ) : (
          <div className="grid flex-1 place-items-center font-script text-5xl opacity-70 sm:text-6xl">print aqui</div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((im, n) => (
            <button
              key={im}
              type="button"
              aria-label={`Ver imagem ${n + 1}`}
              aria-current={n === i}
              onClick={() => { setI(n); setFailed(false) }}
              className={`h-14 flex-1 overflow-hidden rounded-lg border border-current transition ${n === i ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
            >
              <img src={im} alt="" className="size-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Projects() {
  return (
    <section id="projetos" className="wrap pb-16 sm:pb-24 lg:pb-32">
      <Reveal className="mb-10 sm:mb-14">
        <p className="h-script text-wine">Meus</p>
        <h2 className="h-display">PROJETOS</h2>
      </Reveal>
      <div className="space-y-6 sm:space-y-8">
        {PROJECTS.map((p, i) => (
          <article
            key={p.title}
            className={`grid gap-8 rounded-3xl border p-6 sm:p-10 md:sticky md:top-[var(--top)] md:min-h-[26rem] md:grid-cols-2 md:gap-12 lg:p-14 ${p.tone}`}
            style={{ '--top': `${88 + i * 20}px` } as CSSProperties}
          >
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="h-script opacity-90">{p.script}</p>
                <h3 className="h-display text-[clamp(2.5rem,8vw,4.5rem)]">{p.title}</h3>
                <p className="mt-5 max-w-md text-sm leading-7">{p.desc}</p>
              </div>
              <div>
                <ul className="mb-6 flex flex-wrap gap-2 text-xs">
                  {p.stack.map((s) => <li key={s} className="rounded-full border border-current px-3 py-1">{s}</li>)}
                </ul>
                <div className="grid grid-cols-2 gap-3 text-center text-sm font-semibold sm:flex">
                  <a href={p.live} className="rounded-full border border-current bg-cream px-5 py-3 text-wine transition hover:opacity-80">Ver online</a>
                  <a href={p.code} className="rounded-full border border-current px-5 py-3 transition hover:opacity-70">Código</a>
                </div>
              </div>
            </div>
            <Shot images={p.images} alt={`Captura de tela do projeto ${p.title}`} />
          </article>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section wrap">
      <Reveal className="mb-10 sm:mb-14">
        <p className="h-script text-wine">O que uso</p>
        <h2 className="h-display">SKILLS</h2>
      </Reveal>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
        {SKILLS.map((s) => (
          <Reveal key={s.group}>
            <h3 className="mb-4 border-b border-scarlet pb-3 font-display text-3xl">{s.group}</h3>
            <ul className="space-y-2 text-sm">{s.items.map((it) => <li key={it}>✷ {it}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contato" className="section bg-wine text-cream">
      <Reveal className="wrap">
        <p className="h-script">Vamos criar</p>
        <h2 className="font-display text-[clamp(3rem,13vw,12rem)] leading-[0.9]">ALGO JUNTOS</h2>
        <div className="mt-10 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:flex-wrap">
          <a href={`mailto:${ME.email}`} className="break-all rounded-full bg-cream px-6 py-3 text-center text-wine transition hover:bg-paper">{ME.email}</a>
          <a href={ME.github} className="rounded-full border border-cream px-6 py-3 text-center transition hover:bg-cream hover:text-wine">GitHub</a>
          <a href={ME.linkedin} className="rounded-full border border-cream px-6 py-3 text-center transition hover:bg-cream hover:text-wine">LinkedIn</a>
        </div>
        <p className="mt-16 text-xs opacity-70 sm:mt-24">© {new Date().getFullYear()} {ME.name}. Feito com React e Tailwind.</p>
      </Reveal>
    </section>
  )
}

export default function App() {
  useScrollVar()
  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-scarlet"
        style={{ transform: 'scaleX(var(--p, 0))' }}
        aria-hidden
      />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  )
}