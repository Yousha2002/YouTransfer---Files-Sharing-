

import { cookies } from 'next/headers'
import DownloadPageContent from '../../../components/DownloadPageContent'

async function getTransferData(link) {
  try {
    console.log('🔍 Fetching transfer data for link:', link);
    const response = await fetch(`http://localhost:5000/api/transfers/${link}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Transfer data received');
      return data;
    } else {
      console.log('❌ Transfer not found');
      return null;
    }
  } catch (error) {
    console.error('💥 Error fetching transfer:', error);
    return null;
  }
}

export default async function DownloadPage({ params }) {
  const p = await params;
  const link = p.link;
  
  console.log('📄 Download page for link:', link);
  
  const transfer = await getTransferData(link);

  if (!transfer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Transfer Not Found</h1>
          <p className="text-gray-600 mb-6">
            This transfer may have expired or been removed.
          </p>
          <a 
            href="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return <DownloadPageContent transfer={transfer} />;
}