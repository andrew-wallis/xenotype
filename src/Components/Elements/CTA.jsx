import Icon from "./Icon";
import ArrowIcon from "./Icons/ArrowIcon";

function CTA({callback, children}) {

  return (
    <a onClick={(e) => {e.preventDefault(); callback()}} className="inline-block relative rounded-full py-3 pl-6 pr-[14px] bg-gray-100 dark:bg-gray-900 uppercase tracking-wider text-sm leading-6 font-bold flex gap-[5px]" href="#">
    {children}
      <div className="w-[14px] text-gray-600 dark:text-gray-400 flex items-center">
        <ArrowIcon direction="Right" />
      </div>
    </a>
  );
}

export default CTA;