'use client'

import 'swiper/swiper.min.css'

import {
  PackageCheck,
  ShoppingBag,
  Tag,
  Truck,
  Users,
  Users2,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Metrics } from '../page'
import { MetricCard } from './MetricCard'

interface SliderProps {
  metrics: Metrics
}

export function Slider({ metrics }: SliderProps) {
  const {
    productsCount,
    purchasesCount,
    customersCount,
    employeesCount,
    categoriesCount,
    suppliersCount,
  } = metrics

  return (
    <Swiper
      spaceBetween={24}
      // slidesPerView={1.25}
      breakpoints={{
        360: {
          slidesPerView: 1.15,
        },
        768: {
          slidesPerView: 2.25,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      <SwiperSlide>
        <MetricCard
          icon={<PackageCheck className="h-8 w-8 stroke-zinc-900" />}
          label="Produtos em estoque"
          quantity={productsCount}
        />
      </SwiperSlide>

      <SwiperSlide>
        <MetricCard
          icon={<ShoppingBag className="h-8 w-8 stroke-zinc-900" />}
          label="Vendas totais"
          quantity={purchasesCount}
        />
      </SwiperSlide>

      <SwiperSlide>
        <MetricCard
          icon={<Users2 className="h-8 w-8 stroke-zinc-900" />}
          label="Clientes cadastrados"
          quantity={customersCount}
        />
      </SwiperSlide>

      <SwiperSlide>
        <MetricCard
          icon={<Users className="h-8 w-8 stroke-zinc-900" />}
          label="Funcionários"
          quantity={employeesCount}
        />
      </SwiperSlide>

      <SwiperSlide>
        <MetricCard
          icon={<Tag className="h-8 w-8 stroke-zinc-900" />}
          label="Categorias"
          quantity={categoriesCount}
        />
      </SwiperSlide>

      <SwiperSlide>
        <MetricCard
          icon={<Truck className="h-8 w-8 stroke-zinc-900" />}
          label="Fornecedores"
          quantity={suppliersCount}
        />
      </SwiperSlide>
    </Swiper>
  )
}
