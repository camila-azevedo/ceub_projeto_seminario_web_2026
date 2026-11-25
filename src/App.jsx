import { useMemo, useState } from 'react'
import './App.css'

const movies = [
  {
    id: 1,
    title: 'Duna: Parte Dois',
    genre: 'Ficção científica',
    classification: '14',
    duration: '2h 46min',
    rating: '9,1',
    category: 'Em destaque',
    image:
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1100&q=85',
    description:
      'Uma jornada épica pelo deserto de Arrakis. O destino de um povo está nas mãos de Paul Atreides.',
    sessions: ['14:20', '17:40', '21:00'],
  },
  {
    id: 2,
    title: 'A Substância',
    genre: 'Suspense',
    classification: '18',
    duration: '2h 20min',
    rating: '8,4',
    category: 'Mais vistos',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=85',
    description: 'Um thriller intenso sobre identidade, fama e até onde alguém pode ir para recomeçar.',
    sessions: ['15:10', '18:30', '20:50'],
  },
  {
    id: 3,
    title: 'Divertida Mente 2',
    genre: 'Animação',
    classification: 'Livre',
    duration: '1h 36min',
    rating: '8,8',
    category: 'Família',
    image:
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=700&q=85',
    description: 'Novas emoções chegam à mente de Riley em uma aventura para toda a família.',
    sessions: ['13:00', '15:20', '17:30'],
  },
  {
    id: 4,
    title: 'Deadpool & Wolverine',
    genre: 'Ação',
    classification: '18',
    duration: '2h 07min',
    rating: '8,6',
    category: 'Mais vistos',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85',
    description: 'Uma dupla improvável embarca em uma missão que pode mudar o universo.',
    sessions: ['16:00', '19:10', '22:15'],
  },
  {
    id: 5,
    title: 'Ainda Estou Aqui',
    genre: 'Drama',
    classification: '14',
    duration: '2h 17min',
    rating: '9,0',
    category: 'Em destaque',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85',
    description: 'Uma história emocionante sobre memória, coragem e os laços que permanecem.',
    sessions: ['14:40', '18:00', '20:40'],
  },
]

const categories = ['Todos', 'Em destaque', 'Mais vistos', 'Família']
const occupiedSeats = ['A3', 'A7', 'B5', 'C2', 'C6', 'D4', 'D8', 'E1', 'E5']
const seatRows = ['A', 'B', 'C', 'D', 'E']
const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8]

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'pin') {
    return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
  }
  if (name === 'ticket') {
    return <svg {...common}><path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a3 3 0 0 0 0 6v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a3 3 0 0 0 0-6Z" /><path d="M13 5v2m0 4v2m0 4v2" /></svg>
  }
  if (name === 'arrow') {
    return <svg {...common}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
  }
  if (name === 'clock') {
    return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  }
  if (name === 'close') {
    return <svg {...common}><path d="m18 6-12 12M6 6l12 12" /></svg>
  }
  return <svg {...common}><path d="M4 5h16M4 12h16M4 19h16" /></svg>
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedSeats, setSelectedSeats] = useState([])
  const [step, setStep] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [bookingComplete, setBookingComplete] = useState(false)
  const [location, setLocation] = useState('Shopping Pátio Brasil')

  const visibleMovies = useMemo(
    () =>
      activeCategory === 'Todos'
        ? movies
        : movies.filter((movie) => movie.category === activeCategory),
    [activeCategory],
  )
  const sessionDates = useMemo(
    () =>
      [0, 1, 2].map((offset) => {
        const date = new Date()
        date.setDate(date.getDate() + offset)
        const shortDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date)
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' })
          .format(date)
          .replace('.', '')
          .toUpperCase()
        const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
          .format(date)
          .replace('.', '')

        return {
          label: offset === 0 ? 'Hoje' : offset === 1 ? 'Amanhã' : `${weekday[0].toUpperCase()}${weekday.slice(1)}`,
          day: shortDate,
          month,
        }
      }),
    [],
  )

  const openBooking = (movie) => {
    setSelectedMovie(movie)
    setSelectedDate(0)
    setSelectedTime('')
    setSelectedSeats([])
    setStep(0)
    setBookingComplete(false)
  }

  const closeBooking = () => setSelectedMovie(null)
  const toggleSeat = (seat) => {
    setSelectedSeats((current) =>
      current.includes(seat)
        ? current.filter((item) => item !== seat)
        : current.length < 6
          ? [...current, seat]
          : current,
    )
  }
  const total = selectedSeats.length * 38

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Poltrona, início">
          <span className="brand-mark"><span /></span>
          <span>poltrona<span className="brand-dot">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a className="nav-active" href="#filmes">Filmes</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#rodape">Ajuda</a>
        </nav>
        <div className="header-actions">
          <label className="location-select">
            <Icon name="pin" size={17} />
            <select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Escolha seu cinema">
              <option>Shopping Pátio Brasil</option>
              <option>Cine Brasília</option>
              <option>ParkShopping</option>
            </select>
          </label>
          <a className="my-tickets" href="#filmes"><Icon name="ticket" size={17} /> Meus ingressos</a>
          <button className="mobile-menu" type="button" aria-label="Abrir menu"><Icon name="menu" size={22} /></button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-backdrop" />
          <div className="hero-content">
            <span className="eyebrow"><span className="eyebrow-line" /> A SESSÃO PERFEITA COMEÇA AQUI</span>
            <h1>Seu próximo<br />filme favorito<span>.</span></h1>
            <p>Escolha o filme, encontre seu lugar e aproveite<br className="desktop-break" /> cada momento. A gente cuida do resto.</p>
            <a href="#filmes" className="button button-primary">Explorar filmes <Icon name="arrow" size={17} /></a>
            <div className="hero-note"><span className="note-icon">✦</span><span>Uma experiência feita para você<br /><strong>Do play ao “uau”.</strong></span></div>
          </div>
          <div className="hero-film">
            <span className="hero-film-tag">EM CARTAZ</span>
            <div className="hero-film-details">
              <div><span className="hero-film-label">A experiência da semana</span><h2>Duna: Parte Dois</h2></div>
              <button type="button" className="round-arrow" aria-label="Comprar ingresso para Duna: Parte Dois" onClick={() => openBooking(movies[0])}><Icon name="arrow" size={20} /></button>
            </div>
          </div>
          <div className="hero-pagination"><span className="pagination-active" /><span /><span /></div>
        </section>

        <section className="movie-section" id="filmes">
          <div className="section-heading">
            <div>
              <span className="section-kicker">NA TELONA AGORA</span>
              <h2>Filmes em cartaz<span>.</span></h2>
            </div>
            <a href="#filmes" className="text-link">Ver programação completa <Icon name="arrow" size={16} /></a>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filtrar filmes">
            {categories.map((category) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`filter-chip ${activeCategory === category ? 'filter-active' : ''}`}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
            <span className="film-count">{visibleMovies.length} filmes</span>
          </div>
          <div className="movie-grid">
            {visibleMovies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <button className="poster-button" type="button" onClick={() => openBooking(movie)} aria-label={`Ver sessões de ${movie.title}`}>
                  <img className="movie-poster" src={movie.image} alt={`Imagem de ${movie.title}`} />
                  <span className="poster-shade" />
                  <span className="rating"><span>★</span> {movie.rating}</span>
                  <span className="poster-play">▶</span>
                  <span className="classification">{movie.classification}</span>
                </button>
                <div className="movie-info">
                  <div className="movie-meta"><span>{movie.genre}</span><span className="meta-dot" />{movie.duration}</div>
                  <h3>{movie.title}</h3>
                  <button type="button" className="session-link" onClick={() => openBooking(movie)}>Ver sessões <Icon name="arrow" size={15} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-strip" id="sobre">
          <div className="experience-icon">✦</div>
          <div><span className="section-kicker">MAIS DO QUE UM INGRESSO</span><h2>O cinema fica melhor<br className="mobile-break" /> quando é do seu jeito.</h2></div>
          <p>Escolha seu lugar favorito, pague em poucos passos e deixe a pipoca por nossa conta. Sua próxima história começa aqui.</p>
          <a href="#filmes" aria-label="Escolher filme"><Icon name="arrow" size={20} /></a>
        </section>
      </main>

      <footer id="rodape" className="site-footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><span /></span><span>poltrona<span className="brand-dot">.</span></span></a>
        <span>Um lugar para cada história.</span>
        <span>© 2026 Poltrona Cinemas</span>
      </footer>

      {selectedMovie && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeBooking()
        }}>
          <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button type="button" className="modal-close" onClick={closeBooking} aria-label="Fechar"><Icon name="close" size={21} /></button>
            {bookingComplete ? (
              <div className="booking-success">
                <div className="success-check">✓</div>
                <span className="section-kicker">TUDO CERTO!</span>
                <h2>Compra<br />simulada<span>.</span></h2>
                <p>Simulação para <strong>{selectedMovie.title}</strong><br />{sessionDates[selectedDate].label} às {selectedTime} · Poltrona {selectedSeats.join(', ')}<br />Nenhum pagamento foi processado.</p>
                <div className="success-ticket"><Icon name="ticket" size={20} /><span>Resumo da simulação exibido nesta tela</span></div>
                <button type="button" className="button button-primary success-button" onClick={closeBooking}>Voltar aos filmes</button>
              </div>
            ) : (
              <>
                <div className="booking-topline">
                  <span className="section-kicker">GARANTA SEU LUGAR</span>
                  <span className="step-count">0{step + 1} <span>/ 03</span></span>
                </div>
                <h2 id="booking-title">{step === 0 ? 'Escolha sua sessão' : step === 1 ? 'Escolha seus lugares' : 'Quase na tela grande'}</h2>
                <p className="booking-movie-title">{selectedMovie.title} <span>·</span> {location}</p>
                <div className="step-progress"><span className={step >= 0 ? 'progress-on' : ''} /><span className={step >= 1 ? 'progress-on' : ''} /><span className={step >= 2 ? 'progress-on' : ''} /></div>

                {step === 0 && (
                  <div className="booking-content">
                    <h3>Escolha o dia</h3>
                    <div className="date-options">
                      {sessionDates.map((date, index) => (
                        <button type="button" className={`date-option ${selectedDate === index ? 'option-selected' : ''}`} key={date.day} onClick={() => setSelectedDate(index)}>
                          <span>{date.label}</span><strong>{date.day}<small> {date.month}</small></strong>
                        </button>
                      ))}
                    </div>
                    <h3 className="times-heading">Horários disponíveis <span>· Dublado</span></h3>
                    <div className="time-options">
                      {selectedMovie.sessions.map((time) => (
                        <button type="button" className={`time-option ${selectedTime === time ? 'option-selected' : ''}`} key={time} onClick={() => setSelectedTime(time)}>{time}</button>
                      ))}
                    </div>
                    <div className="cinema-summary"><Icon name="pin" size={17} /><span><strong>{location}</strong><small>Sala 4 · 2D · Dublado</small></span><Icon name="clock" size={16} /></div>
                  </div>
                )}

                {step === 1 && (
                  <div className="booking-content seats-content">
                    <div className="screen-indicator"><span />TELA<span /></div>
                    <div className="seat-grid" aria-label="Mapa de assentos">
                      {seatRows.map((row) => (
                        <div className="seat-row" key={row}>
                          <span className="row-label">{row}</span>
                          {seatNumbers.map((number) => {
                            const seat = `${row}${number}`
                            const occupied = occupiedSeats.includes(seat)
                            return <button type="button" key={seat} aria-label={`Assento ${seat}${occupied ? ', ocupado' : ''}`} aria-pressed={selectedSeats.includes(seat)} disabled={occupied} onClick={() => toggleSeat(seat)} className={`seat ${occupied ? 'seat-taken' : ''} ${selectedSeats.includes(seat) ? 'seat-selected' : ''}`} />
                          })}
                          <span className="row-label">{row}</span>
                        </div>
                      ))}
                    </div>
                    <div className="seat-legend"><span><i className="legend-seat" />Disponível</span><span><i className="legend-seat legend-selected" />Selecionado</span><span><i className="legend-seat legend-taken" />Ocupado</span></div>
                    <p className="seat-hint">{selectedSeats.length === 6 ? 'Limite de 6 assentos selecionados' : 'Toque para selecionar até 6 assentos'}</p>
                  </div>
                )}

                {step === 2 && (
                  <form className="booking-content payment-content" onSubmit={(event) => { event.preventDefault(); setBookingComplete(true) }}>
                    <div className="order-summary">
                      <div><span>{selectedSeats.length} ingresso{selectedSeats.length === 1 ? '' : 's'} · {selectedSeats.join(', ')}</span><strong>R$ {total.toFixed(2).replace('.', ',')}</strong></div>
                      <div><span>Taxa de serviço</span><strong>R$ 4,50</strong></div>
                      <div className="order-total"><span>Total</span><strong>R$ {(total + 4.5).toFixed(2).replace('.', ',')}</strong></div>
                    </div>
                    <h3>Forma de pagamento</h3>
                    <div className="payment-options">
                      <button type="button" className={`payment-option ${paymentMethod === 'pix' ? 'option-selected' : ''}`} onClick={() => setPaymentMethod('pix')}><span className="payment-symbol">◇</span><span><strong>Pix</strong><small>Aprovação imediata</small></span><i /></button>
                      <button type="button" className={`payment-option ${paymentMethod === 'card' ? 'option-selected' : ''}`} onClick={() => setPaymentMethod('card')}><span className="payment-symbol">▤</span><span><strong>Cartão</strong><small>Crédito ou débito</small></span><i /></button>
                    </div>
                    {paymentMethod === 'card' && <label className="card-field">Número do cartão<input type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" maxLength="19" required /></label>}
                    <label className="email-field">E-mail para receber o ingresso<input type="email" placeholder="voce@email.com" required /></label>
                    <p className="secure-note">Demonstração de checkout: nenhum pagamento será processado.</p>
                    <button className="button button-primary pay-button" type="submit">Pagar R$ {(total + 4.5).toFixed(2).replace('.', ',')} <Icon name="arrow" size={17} /></button>
                  </form>
                )}

                {!bookingComplete && (
                  <div className="modal-footer">
                    {step > 0 && <button type="button" className="back-button" onClick={() => setStep(step - 1)}>Voltar</button>}
                    <span className="price-preview">{step < 2 && selectedSeats.length > 0 ? `R$ ${total.toFixed(2).replace('.', ',')}` : step === 1 ? 'R$ 38,00 / ingresso' : ''}</span>
                    {step < 2 && <button type="button" className="button button-primary continue-button" disabled={step === 0 ? !selectedTime : selectedSeats.length === 0} onClick={() => setStep(step + 1)}>{step === 0 ? 'Escolher assentos' : 'Continuar'} <Icon name="arrow" size={16} /></button>}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default App
