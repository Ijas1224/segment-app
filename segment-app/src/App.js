import React, { useState } from 'react';
import './App.css';

const schemas = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [additionalSchemas, setAdditionalSchemas] = useState([]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    resetForm();
  };

  const resetForm = () => {
    setSegmentName('');
    setSelectedSchemas([]);
    setAdditionalSchemas([]);
  };

  const handleSaveSegment = async () => {
    const data = {
        segment_name: segmentName,
        schema: [
            ...selectedSchemas.map((value) => {
                const foundSchema = schemas.find(schema => schema.value === value);
                return { [foundSchema.value]: foundSchema.label };
            }),
            ...additionalSchemas.map((value) => {
                const foundSchema = schemas.find(schema => schema.value === value);
                return { [foundSchema.value]: foundSchema.label };
            }),
        ],
    };

    try {
        const response = await fetch('https://webhook.site/150b32fd-aa63-48e3-89f2-1c83f14a74ab', { // Webhook URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Data sent successfully:', data);
        } else {
            console.error('Error sending data:', response.statusText);
        }
    } catch (error) {
        console.error('Network error:', error);
    }

    togglePopup();
};

    try {
        const response = await fetch('YOUR_WEBHOOK_URL', { // Replace with your Webhook URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Data sent successfully:', data);
        } else {
            console.error('Error sending data:', response.statusText);
        }
    } catch (error) {
        console.error('Network error:', error);
    }

    togglePopup();
};


  const handleSchemaChange = (index, value) => {
    const newSelectedSchemas = [...selectedSchemas];
    newSelectedSchemas[index] = value;
    setSelectedSchemas(newSelectedSchemas);
  };

  const handleAddSchema = () => {
    setAdditionalSchemas([...additionalSchemas, '']);
  };

  const handleNewSchemaChange = (index, value) => {
    const newAdditionalSchemas = [...additionalSchemas];
    newAdditionalSchemas[index] = value;
    setAdditionalSchemas(newAdditionalSchemas);
  };

  return (
    <div className="App">
      <button onClick={togglePopup}>Save segment</button>
      {isOpen && (
        <div className="popup">
          <h2>Save Segment</h2>
          <input
            type="text"
            placeholder="Segment Name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
          <select
            onChange={(e) => {
              handleSchemaChange(selectedSchemas.length, e.target.value);
              e.target.value = '';
            }}
          >
            <option value="">Add schema to segment</option>
            {schemas
              .filter(
                (schema) =>
                  !selectedSchemas.includes(schema.value) &&
                  !additionalSchemas.includes(schema.value)
              )
              .map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
          </select>
          <div>
            <a href="#" onClick={handleAddSchema} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
              + Add new schema
            </a>
          </div>

          <div className="additional-schemas">
            {additionalSchemas.map((schema, index) => (
              <select
                key={index}
                onChange={(e) => handleNewSchemaChange(index, e.target.value)}
              >
                <option value="">Select schema</option>
                {schemas
                  .filter(
                    (schemaOption) =>
                      !selectedSchemas.includes(schemaOption.value) &&
                      !additionalSchemas.includes(schemaOption.value)
                  )
                  .map((schemaOption) => (
                    <option key={schemaOption.value} value={schemaOption.value}>
                      {schemaOption.label}
                    </option>
                  ))}
              </select>
            ))}
          </div>

          <button onClick={handleSaveSegment}>Save the segment</button>
          <button onClick={togglePopup}>Close</button>
        </div>  
      )}
    </div>
  );
}

export default App;
