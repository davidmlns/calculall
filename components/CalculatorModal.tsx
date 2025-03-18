import { Pressable, Text, TextInput, View } from 'react-native';
import { BackSpaceIcon, CloseIcon } from './Icons';

export default function CalculatorModal() {
  return (
    <View className='w-96 h-96 bg-slate-700 mx-auto relative rounded-3xl'>
      <View className='relative p-2 border-b-2 border-slate-500 h-2/5'>
        <CloseIcon size={32} color='#c7c7c7' />
        <TextInput />
      </View>

      <View className='grid grid-cols-4 grid-rows-4 gap-4 p-2'>
        <Pressable className='col-start-1 row-start-1'>
          <Text>1</Text>
        </Pressable>
        <Pressable className='col-start-2 row-start-1'>
          <Text>2</Text>
        </Pressable>
        <Pressable className='col-start-3 row-start-1'>
          <Text>3</Text>
        </Pressable>
        <Pressable className='col-start-4 row-start-1'>
          <BackSpaceIcon size={32} color='#ffffff' />
        </Pressable>
        <Pressable className='col-start-1 row-start-2'>
          <Text>5</Text>
        </Pressable>
        <Pressable className='col-start-2 row-start-2'>
          <Text>6</Text>
        </Pressable>
        <Pressable className='col-start-3 row-start-2'>
          <Text>7</Text>
        </Pressable>
        <Pressable className='col-start-1 row-start-3'>
          <Text>8</Text>
        </Pressable>
        <Pressable className='col-start-2 row-start-3'>
          <Text>9</Text>
        </Pressable>
        <Pressable className='col-start-3 row-start-3'>
          <Text>10</Text>
        </Pressable>
        <Pressable className='col-start-1 row-start-4'>
          <Text>11</Text>
        </Pressable>
        <Pressable className='col-start-2 row-start-4'>
          <Text>12</Text>
        </Pressable>
        <Pressable className='col-start-3 row-start-4'>
          <Text>13</Text>
        </Pressable>
      </View>
    </View>
  );
}
