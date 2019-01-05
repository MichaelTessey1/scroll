class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true
  
  has_many :comments
  has_many :posts

  def to_token_payload
    {
      sub: id,
      email: email
    }
  end
  
end
