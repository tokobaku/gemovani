<?php
/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

namespace App\Http\Requests\Helpers;

/**
 * Trait JsonValidator
 * Adds json validation logic
 */
trait JsonValidator
{
    /**
     * @var string
     */
    public $jsonString;

    /**
     * @var array
     */
    public $errorMessages;

    /**
     * @param string $jsonString
     * @return $this
     */
    public function setJsonString(string $jsonString): self
    {
        $this->jsonString = $jsonString;

        return $this;
    }

    /**
     * @return self
     */
    public function isArray(): self
    {
        $jsonString = trim($this->jsonString);

        if ($jsonString[0] !== '[' || $jsonString[strlen($jsonString) - 1] !== ']') {
            $this->addErrorMessage('isArray', 'Given string does not represent a json array');

            return $this;
        }

        $this->isValidJson();

        return $this;
    }

    /**
     * @return $this
     */
    public function isValidJson(): self
    {
        json_decode($this->jsonString);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->addErrorMessage('json_decode', json_last_error_msg());

            return $this;
        }

        return $this;
    }

    /**
     * @return $this
     */
    public function jsonIsNotEmpty(): self
    {
        if ($this->isValidJson()->passedValidation() && count(json_decode($this->jsonString)) > 0) {
            return $this;
        }

        $this->addErrorMessage('notEmpty', 'Json is empty');

        return $this;
    }

    /**
     * @return bool
     */
    public function passedValidation(): bool
    {
        if ($this->errorMessages) {
            return count($this->errorMessages) === 0;
        }

        return true;
    }

    /**
     * @param string $key
     * @param string $errorMessage
     * @return JsonValidator
     */
    private function addErrorMessage(string $key, string $errorMessage): self
    {
        $this->errorMessages[$key] = $errorMessage;

        return $this;
    }
}
