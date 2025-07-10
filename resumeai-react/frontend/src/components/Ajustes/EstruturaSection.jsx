import React from "react";
import ToggleSwitch from "../ToggleSwitch";

export default function EstruturaSection () {
    return (
        <div className="mb-2">
            <h3 className="font-semibold text-lg mb-1">Estrutura</h3>
            <ToggleSwitch label="Separar em tópicos" initialValue = {true} />
            <ToggleSwitch label="Estrutura visual" />
        </div>
    );
}