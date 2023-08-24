export type LinkData = {
  label: string
  path: string
}

export const productsLinks: LinkData[] = [
  {
    label: 'Visualizar todos os produtos',
    path: '/products',
  },
  {
    label: 'Cadastrar um produto',
    path: '/products/add',
  },
  {
    label: 'Cadastrar produtos via excel',
    path: '/products/import',
  },
  {
    label: 'Adicione imagens a um produto',
    path: '/products/images/upload',
  },
  {
    label: 'Remova imagens de um produto',
    path: '/products/images/remove',
  },
  {
    label: 'Resgatar produtos',
    path: '/products/restore',
  },
]

export const salesLinks: LinkData[] = [
  {
    label: 'Relatório de vendas',
    path: '/sales',
  },
  {
    label: 'Vender um produto',
    path: '/sales/sell',
  },
]

export const customersLinks: LinkData[] = [
  {
    label: 'Visualizar todos os clientes',
    path: '/customers',
  },
  {
    label: 'Adicionar um novo cliente',
    path: '/customers/add',
  },
]

export const employeesLinks: LinkData[] = [
  {
    label: 'Visualizar todos os funcionários',
    path: '/employees',
  },
  {
    label: 'Adicionar um novo funcionário',
    path: '/employees/add',
  },
]

export const suppliersLinks: LinkData[] = [
  {
    label: 'Visualizar todos os fornecedores',
    path: '/suppliers',
  },
  {
    label: 'Adicionar um novo fornecedor',
    path: '/suppliers/add',
  },
]
