interface SpinnerProps {
  color?: 'dark' | 'purple'
}

export function Spinner({ color = 'purple' }: SpinnerProps) {
  return <div className={color === 'dark' ? 'spinner-dark' : 'spinner'}></div>
}
