

type MessagesProps = {
  messages: any
};

const MessagesBox = ({ messages }: MessagesProps) => {
  return (
    <div className="w-full px-4 py-6 flex flex-col gap-6 h-full overflow-y-auto text-justify">
      {messages ? (
        messages?.map((message: any, index: number) => (
          message
        ))
      ) : (
        <div className="flex w-full h-full items-center justify-center text-gray-400 font-extralight"> Preenche os campos... </div>
      )}
    </div>
  );
};

export default MessagesBox;
