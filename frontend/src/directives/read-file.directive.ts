interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
}

export function ReadFile() {
	return {
		restrict: "A",
		scope: false,
		link: (scope, element, attrs) => {
            
			element.on("change", (onChangeEvent) => {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent: FileReaderEvent) {
					scope.$apply(() => {
						scope.vm.data = JSON.parse(onLoadEvent.target.result);
						scope.vm.input = scope.vm.data.input;
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
};