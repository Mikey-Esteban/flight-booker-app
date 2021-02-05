class AddOriginReferenceToFlights < ActiveRecord::Migration[6.0]
  def change
    add_reference :flights, :origin, foreign_key: { to_table: :airports }, null: false
  end
end
