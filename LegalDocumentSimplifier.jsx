import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, AlertCircle, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';

const LegalDocumentSimplifier = () => {
  const [inputText, setInputText] = useState('');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [complexityScore, setComplexityScore] = useState(null);
  const [keyTerms, setKeyTerms] = useState([]);
  const fileInputRef = useRef(null);

  const legalTerms = {
    'hereinafter': 'from now on',
    'whereas': 'since',
    'heretofore': 'before this',
    'pursuant to': 'according to',
    'notwithstanding': 'despite',
    'aforementioned': 'mentioned above',
    'thereunder': 'under that',
    'whereby': 'by which',
    'therein': 'in that',
    'thereof': 'of that',
    'hereunder': 'under this agreement',
    'party of the first part': 'first party',
    'party of the second part': 'second party',
    'covenant': 'promise',
    'indemnify': 'protect from loss',
    'representations and warranties': 'statements and promises',
    'force majeure': 'circumstances beyond control',
    'liquidated damages': 'predetermined penalty amount',
    'consideration': 'payment or value exchanged',
    'breach': 'violation',
    'remedy': 'solution',
    'jurisdiction': 'legal authority',
    'liable': 'responsible',
    'negligence': 'failure to use reasonable care',
    'good faith': 'honest intention',
    'material adverse effect': 'significant negative impact',
    'due diligence': 'careful investigation',
    'intellectual property': 'creative works and inventions',
    'confidentiality': 'keeping information secret',
    'non-disclosure': 'agreement not to share information',
    'terminate': 'end',
    'effective date': 'start date',
    'executed': 'signed',
    'binding': 'legally enforceable',
    'hold harmless': 'protect from responsibility',
    'in witness whereof': 'to confirm this agreement',
    'duly authorized': 'properly approved',
    'supersedes': 'replaces',
    'enforceable': 'can be legally required',
    'affiliates': 'related companies',
    'constitute': 'make up',
    'mutually agree': 'both parties agree'
  };

  const simplifyText = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const termsFound = [];
      let simplified = inputText;
      Object.entries(legalTerms).forEach(([term, simple]) => {
        const regex = new RegExp(`\b${term}\b`, 'gi');
        if (regex.test(simplified)) {
          termsFound.push(term);
          simplified = simplified.replace(regex, `${simple} (${term})`);
        }
      });
      setSimplifiedText(simplified);
      setKeyTerms(termsFound);
      setComplexityScore(((termsFound.length / (inputText.split(' ').length)) * 100).toFixed(2));
      setShowComparison(true);
      setIsProcessing(false);
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setInputText(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt" />
      <button onClick={simplifyText}>Simplify Document</button>
      {isProcessing && <Loader2 className="animate-spin" />}
      {showComparison && (
        <div>
          <h2>Original Text</h2>
          <p>{inputText}</p>
          <h2>Simplified Text</h2>
          <p>{simplifiedText}</p>
          <h3>Complexity Score: {complexityScore}%</h3>
          <h3>Replaced Legal Terms:</h3>
          <ul>{keyTerms.map((term, i) => <li key={i}>{term} → {legalTerms[term]}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default LegalDocumentSimplifier;