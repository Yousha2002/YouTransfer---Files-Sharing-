// import './globals.css'

// export const metadata = {
//   title: 'WEPRESENT - File Sharing',
//   description: 'Secure file sharing platform',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50">
//         {children}
//       </body>
//     </html>
//   )
// }

import './globals.css'
import ReduxProvider from '../store/providers'
import Header from '@/components/Header'

export const metadata = {
  title: 'WEPRESENT - File Sharing',
  description: 'Secure file sharing platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ReduxProvider>
          <Header/>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}