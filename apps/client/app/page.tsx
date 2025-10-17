'use client';

import { useMemo, useState } from 'react';
import { Container, Row, Col, Form, Button, Badge, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import styles from './page.module.scss';
import { HeroBanner } from '@reserver/ui';

type SearchForm = {
  destination: string;
  checkIn: string;
  checkOut: string;
};

type HotelTeaser = {
  id: string;
  name: string;
  city: string;
  rating: number;
  minPrice: number;
  amenities: string[];
};

const mockHotels: HotelTeaser[] = [
  {
    id: 'riad-eden',
    name: 'Riad Eden Medina',
    city: 'Marrakech',
    rating: 4.6,
    minPrice: 920,
    amenities: ['Rooftop', 'Spa', 'Wi-Fi']
  },
  {
    id: 'casablanca-skyline',
    name: 'Skyline Business Hotel',
    city: 'Casablanca',
    rating: 4.3,
    minPrice: 780,
    amenities: ['Salle de réunion', 'Navette', 'Piscine']
  },
  {
    id: 'agadir-sunset',
    name: 'Agadir Sunset Resort',
    city: 'Agadir',
    rating: 4.8,
    minPrice: 1100,
    amenities: ['Plage privée', 'Kids Club', 'All inclusive']
  }
];

const defaultForm: SearchForm = {
  destination: '',
  checkIn: dayjs().add(7, 'day').format('YYYY-MM-DD'),
  checkOut: dayjs().add(10, 'day').format('YYYY-MM-DD')
};

export default function HomePage() {
  const [form, setForm] = useState<SearchForm>(defaultForm);

  const filteredHotels = useMemo(() => {
    if (!form.destination.trim()) {
      return mockHotels;
    }
    return mockHotels.filter((hotel) =>
      `${hotel.name} ${hotel.city}`.toLowerCase().includes(form.destination.toLowerCase()),
    );
  }, [form.destination]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: brancher sur l'API de recherche NestJS via React Query
  };

  return (
    <Container className="py-5 flex-grow-1" as="section" aria-labelledby="home-title">
      <Row className="justify-content-center mb-5">
        <Col lg={8}>
          <HeroBanner
            className={styles.hero}
            eyebrow="Nouvelle plateforme 100% marocaine"
            title="Trouvez l&apos;adresse parfaite pour votre prochain séjour"
            description="Recherche intelligente, comparaisons transparentes et assistance locale. Réservez en toute confiance avec reserver.ma."
            titleId="home-title"
          />
          <Form onSubmit={handleSubmit} className="row g-3" aria-label="Recherche d'hôtels">
              <Col lg={6}>
                <Form.Label htmlFor="destination" className="fw-semibold">
                  Destination ou hôtel
                </Form.Label>
                <Form.Control
                  id="destination"
                  name="destination"
                  placeholder="Ville, région, hôtel"
                  value={form.destination}
                  onChange={handleChange}
                  aria-describedby="destination-help"
                />
                <Form.Text id="destination-help">
                  Exemples : Marrakech, Agadir, Fès…
                </Form.Text>
              </Col>
              <Col md={3}>
                <Form.Label htmlFor="checkIn" className="fw-semibold">
                  Arrivée
                </Form.Label>
                <Form.Control
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                  min={dayjs().format('YYYY-MM-DD')}
                />
              </Col>
              <Col md={3}>
                <Form.Label htmlFor="checkOut" className="fw-semibold">
                  Départ
                </Form.Label>
                <Form.Control
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                  min={form.checkIn}
                />
              </Col>
              <Col xs={12} className="d-flex justify-content-end">
                <Button type="submit" size="lg" className="px-4">
                  Rechercher
                </Button>
              </Col>
            </Form>
        </Col>
      </Row>

      <Row as="section" aria-label="Suggestions populaires" className="g-4">
        {filteredHotels.map((hotel) => (
          <Col md={4} key={hotel.id}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fs-4 mb-2">{hotel.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{hotel.city}</Card.Subtitle>
                <div className="mb-2" aria-label={`Note ${hotel.rating} sur 5`}>
                  <strong>{hotel.rating.toFixed(1)}</strong>/5
                </div>
                <div className="mb-3">
                  {hotel.amenities.map((amenity) => (
                    <Badge key={amenity} bg="light" text="dark" className="me-2">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <Card.Text className="fw-semibold">
                  À partir de {hotel.minPrice.toLocaleString('fr-MA')} MAD / nuit
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-transparent border-0">
                <Button variant="outline-primary" className="w-100" size="lg">
                  Voir les détails
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
