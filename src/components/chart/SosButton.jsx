import React from 'react';
import { useTaskStore } from '../../store/useTaskStore'; // ストアを読み込み

const SosButton = () => {
  // ストアから関数を取得
  const { addLog } = useTaskStore();

  const handleClick = () => {
    // ここで固定メッセージを送る
    addLog("🚨 SOS！誰か助けてください！");

    // オプション: 本当のアラートも出すならこれ
    // alert("SOSを発信しました！");
  };

  return (
    <button className="sos-button" onClick={handleClick}>
      SOS
    </button>
  );
};

export default SosButton;