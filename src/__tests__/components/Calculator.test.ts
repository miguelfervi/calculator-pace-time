import { describe, it, expect } from "@jest/globals";
import { mount } from "@vue/test-utils";
import Calculator from "../../components/Calculator.vue";

describe("Calculator.vue", () => {
  it("should render the calculator component", () => {
    const wrapper = mount(Calculator);
    expect(wrapper.find("h1").text()).toBe("Calculadora de Ritmo");
  });

  it("should render all three input fields", () => {
    const wrapper = mount(Calculator);
    const inputs = wrapper.findAllComponents({ name: "InputWithSelector" });
    expect(inputs.length).toBe(3);
  });

  it("should render calculate and clear buttons", () => {
    const wrapper = mount(Calculator);
    const buttons = wrapper.findAll("button");
    const buttonTexts = buttons.map(btn => btn.text());
    expect(buttonTexts).toContain("Calcular");
    expect(buttonTexts).toContain("Limpiar");
  });

  it("should render information message", () => {
    const wrapper = mount(Calculator);
    const infoMessage = wrapper.find('[class*="bg-amber-50"]');
    expect(infoMessage.exists()).toBe(true);
    expect(infoMessage.text()).toContain("Información");
  });

  it("should pass isCalculated prop to InputWithSelector components", () => {
    const wrapper = mount(Calculator);
    const inputs = wrapper.findAllComponents({ name: "InputWithSelector" });

    inputs.forEach(input => {
      expect(input.props("isCalculated")).toBeDefined();
      expect(typeof input.props("isCalculated")).toBe("boolean");
    });
  });
});
