interface Props {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function CategoryLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
