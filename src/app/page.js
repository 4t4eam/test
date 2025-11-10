"use client";

import React, { useState } from 'react';
import { Search, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function TruthTrace() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeInput = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    
    // Gemini API 호출 시뮬레이션
    setTimeout(() => {
      // 예시 결과 데이터
      const mockResult = {
        inputText: input,
        reliability: 'low', // 'high', 'medium', 'low'
        summary: '해당 주장은 신뢰할 수 있는 출처가 부족하며, 일부 과장된 표현이 포함되어 있습니다.',
        sources: [
          {
            type: 'original',
            title: '개인 블로그 게시글',
            url: 'example.com/blog',
            reliability: 'low',
            date: '2024-01-15'
          },
          {
            type: 'citation',
            title: '커뮤니티 재인용',
            url: 'example.com/forum',
            reliability: 'low',
            date: '2024-02-20'
          }
        ],
        verifiedClaims: [
          { text: 'XX 백신은', status: 'verified' },
          { text: '위험하다', status: 'unverified' }
        ]
      };
      
      setResult(mockResult);
      setLoading(false);
    }, 2000);
  };

  const getReliabilityColor = (reliability) => {
    switch(reliability) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getReliabilityIcon = (reliability) => {
    switch(reliability) {
      case 'high': return <CheckCircle className="w-5 h-5" />;
      case 'medium': return <AlertCircle className="w-5 h-5" />;
      case 'low': return <XCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">TruthTrace</h1>
          <p className="text-gray-600 mt-1">AI 기반 정보 출처 검증 서비스</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            정보 입력
          </h2>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="검증하고 싶은 정보나 URL을 입력하세요...&#10;예시: 'XX 백신은 위험하다' 또는 'https://example.com/article'"
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <button
            onClick={analyzeInput}
            disabled={loading || !input.trim()}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                출처 분석하기
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Reliability Summary */}
            <div className={`rounded-lg p-6 border-2 ${
              result.reliability === 'high' ? 'border-green-200 bg-green-50' :
              result.reliability === 'medium' ? 'border-yellow-200 bg-yellow-50' :
              'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-start gap-3">
                <div className={getReliabilityColor(result.reliability)}>
                  {getReliabilityIcon(result.reliability)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">신뢰도 평가</h3>
                  <p className="text-gray-700">{result.summary}</p>
                </div>
              </div>
            </div>

            {/* Verified Claims */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                문장별 검증 결과
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.verifiedClaims.map((claim, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm ${
                      claim.status === 'verified'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {claim.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Source Graph */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">출처 추적 그래프</h3>
              <div className="flex items-center justify-around py-8">
                {result.sources.map((source, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                        source.reliability === 'high' ? 'bg-green-100 border-4 border-green-500' :
                        source.reliability === 'medium' ? 'bg-yellow-100 border-4 border-yellow-500' :
                        'bg-red-100 border-4 border-red-500'
                      }`}>
                        <FileText className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-medium mt-2 text-center max-w-[100px]">
                        {source.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{source.date}</p>
                    </div>
                    {idx < result.sources.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gray-300 mx-4" />
                    )}
                  </React.Fragment>
                ))}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-blue-100 border-4 border-blue-500">
                    <Search className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium mt-2">입력 정보</p>
                </div>
              </div>
            </div>

            {/* Detailed Report */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">상세 리포트</h3>
              <div className="space-y-4">
                {result.sources.map((source, idx) => (
                  <div key={idx} className="border-l-4 border-gray-300 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getReliabilityColor(source.reliability)}`}>
                        {source.reliability === 'high' ? '신뢰도 높음' :
                         source.reliability === 'medium' ? '신뢰도 보통' : '신뢰도 낮음'}
                      </span>
                      <span className="text-sm text-gray-500">{source.date}</span>
                    </div>
                    <p className="font-medium">{source.title}</p>
                    <a href={source.url} className="text-sm text-blue-600 hover:underline">
                      {source.url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <div className="text-center py-16 text-gray-500">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>정보를 입력하고 분석을 시작하세요</p>
          </div>
        )}
      </main>
    </div>
  );
}