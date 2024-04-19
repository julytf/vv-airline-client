import { route } from '@/utils/helpers'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className='mt-auto grid min-h-40 w-full grid-cols-12 gap-4 bg-sky-100 p-8'>
      <div className='col-span-3'>
        <div className='bold text-2xl'>VV Airline</div>
        <div>Hãng hàng không VV Airline</div>
      </div>
      <div className='col-span-3'>
        <div className='pb-4 text-gray-400'>Chính Sách</div>
        <Link to={route('/policy/ticket-class-policy', {})}>
          <div>Chính Sách Giá Vé </div>
        </Link>
      </div>
      <div className='col-span-3'>
        {/* TODO: */}
        <div className='pb-4 text-gray-400'>Điểm đến nổi bật</div>
        <Link
          to={route('/articles/:id', {
            params: {
              id: 'Tokyo',
            },
          })}
        >
          <div>Tokyo</div>
        </Link>
        <Link
          to={route('/articles/:id', {
            params: {
              id: 'Đà Lạt',
            },
          })}
        >
          <div>Đà Lạt</div>
        </Link>
        <Link
          to={route('/articles/:id', {
            params: {
              id: 'Phú Quốc',
            },
          })}
        >
          <div>Phú Quốc</div>
        </Link>
      </div>
      <div className='col-span-3'>
        <div className='pb-4 text-gray-400'>Liên hệ</div>
        <div>Hotline: 0939099999</div>
        <div>Email: support@vvairline.com</div>
        <div className='mt-2 flex gap-x-2'>
          <Link to={'https://facebook.com/vvairline'}>
            <i className='fa-brands fa-facebook-f'></i>
          </Link>
          <Link to={'https://instagram.com/vvairline'}>
            <i className='fa-brands fa-instagram'></i>
          </Link>
          <Link to={'https://twitter.com/vvairline'}>
            <i className='fa-brands fa-twitter'></i>
          </Link>
          <Link to={'https://youtube.com/vvairline'}>
            <i className='fa-brands fa-youtube'></i>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
