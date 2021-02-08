class CreatePassengers < ActiveRecord::Migration[6.0]
  def change
    create_table :passengers do |t|
      t.string :name
      t.string :email
      t.belongs_to :flight, null: false, foreign_key: true
      t.belongs_to :booking, null: false, foreign_key: true

      t.timestamps
    end
  end
end
