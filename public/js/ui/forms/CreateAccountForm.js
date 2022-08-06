/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, resp) => {
			if (resp && resp.success) {
				let formModal = App.getModal("createAccount");
				formModal.close();
				this.element.reset();
				App.update();
				App.getWidget("account").update()
			} else {
				console.log("Ошибка при создании счета");
			}
		});
  }
  }
