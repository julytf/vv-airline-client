import { FunctionComponent } from 'react'

interface TicketClassPolicyProps {}

const TicketClassPolicy: FunctionComponent<TicketClassPolicyProps> = () => {
  return (
    <div className='w-full pb-32'>
      <div className='bold pb-8 text-center text-2xl'>Chính Sách Hạng Vé</div>
      <table className='w-full border'>
        <thead>
          <tr>
            <th className='border p-2'>Hạng vé</th>
            <th className='border p-2'>Hành lý</th>
            <th className='border p-2'>Hoàn vé</th>
            {/* <th className='border p-2'>Đổi vé</th> */}
            <th className='border p-2'>Chọn trước chỗ ngồi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border p-2'>Thương gia linh hoạt</td>
            <td className='border p-2'>
              <p>Hành lý xách tay: Hãng cho phép hành khách mang theo 01 kiện 18kg.</p>
              <p> Hành lý ký gửi: Cho phép mang theo 01 kiện không quá 32kg.</p>
            </td>
            <td className='border p-2'>Thu phí 360.000 VNĐ</td>
            {/* <td className='border p-2'>Miễn phí</td> */}
            <td className='border p-2'>Miễn phí</td>
          </tr>
          <tr>
            <td className='border p-2'>Thương gia tiêu chuẩn</td>
            <td className='border p-2'>
              <p>Hành lý xách tay: Hãng cho phép hành khách mang theo 01 kiện 18kg.</p>
              <p> Hành lý ký gửi: Cho phép mang theo 01 kiện không quá 32kg.</p>
            </td>
            <td className='border p-2'>Thu phí 500.000 VNĐ</td>
            {/* <td className='border p-2'>Thu phí 360.000 VNĐ/1 lần đổi</td> */}
            <td className='border p-2'>Miễn phí</td>
          </tr>
          <tr>
            <td className='border p-2'>Phổ thông linh hoạt</td>
            <td className='border p-2'>
              <p>Hành lý xách tay: Được mang theo 01 kiện 10kg và 01 phụ kiện 2kg.</p>
              <p>Hành lý ký gửi: Không quá 23kg.</p>
            </td>
            <td className='border p-2'>Thu phí 500.000 VNĐ</td>
            {/* <td className='border p-2'>Miễn phí</td> */}
            <td className='border p-2'>Thu phí</td>
          </tr>
          <tr>
            <td className='border p-2'>Phổ thông tiêu chuẩn</td>
            <td className='border p-2'>
              <p>Hành lý xách tay: Được mang theo 01 kiện 10kg và 01 phụ kiện 2kg.</p>
              <p>Hành lý ký gửi: Không quá 23kg.</p>
            </td>
            <td className='border p-2'>Không áp dụng</td>
            {/* <td className='border p-2'>Thu phí 500.000 VNĐ/1 lần đổi</td> */}
            <td className='border p-2'>Thu phí</td>
          </tr>
          <tr>
            <td className='border p-2'>Phổ thông tiết kiệm</td>
            <td className='border p-2'>
              <p>Hành lý xách tay: Hãng cho phép hành khách mang theo 01 kiện 18kg.</p>
              {/* <p> Hành lý ký gửi: Cho phép mang theo 01 kiện không quá 32kg.</p> */}
            </td>
            <td className='border p-2'>Không áp dụng</td>
            {/* <td className='border p-2'>Không áp dụng</td> */}
            <td className='border p-2'>Thu phí</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TicketClassPolicy
