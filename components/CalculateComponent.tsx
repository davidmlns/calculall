import { View, Text, Pressable } from 'react-native';
import OptionModal from './OptionModal';
import { useState } from 'react';

export interface Operation {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface CalculateComponentProps {
  operations: Operation[];
  onCalculate?: (operationId: string) => void;
  onSendOperation: (text: string) => void;
}
export default function CalculateComponent({
  operations,
  onCalculate,
  onSendOperation,
}: CalculateComponentProps) {
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectOperation = (operationId: string) => {
    setSelectedOperation(operationId);
    onSendOperation(operationId);
    onCalculate?.(operationId);
    setModalVisible(false);
  };

  const selectedOp = operations.find(op => op.id === selectedOperation);

  return (
    <OptionModal
      title={selectedOp?.title || ''}
      description={selectedOp?.description}
      icon={selectedOp?.icon}
      isVisible={modalVisible}
      onClose={() => setModalVisible(false)}
      onOpen={() => setModalVisible(true)}>
      <View className='space-y-2 flex'>
        {operations.map(operation => (
          <Pressable
            key={operation.id}
            onPress={() => handleSelectOperation(operation.id)}
            className={`p-3 rounded-lg ${selectedOperation === operation.id ? 'bg-primary' : 'bg-background-secondary'} flex-row items-center`}>
            <View className='mr-3 bg-icon-background w-10 h-10 rounded-lg flex items-center justify-center'>
              {operation.icon}
            </View>
            <View>
              <Text className='text-white text-base'>{operation.title}</Text>
              <Text className='text-slate-400 text-sm'>{operation.description}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </OptionModal>
  );
}
