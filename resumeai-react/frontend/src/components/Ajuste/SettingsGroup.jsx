// src/components/SettingsGroup.jsx
import React from 'react';

function SettingsGroup({ title, children }) {
  return (
    <div className="pb-2 mb-2">
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

export default SettingsGroup;